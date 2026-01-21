import { useState, useRef, useLayoutEffect } from 'react';

const VariableList = ({ items, estimatedHeight = 50, containerHeight }) => {
	const [scrollTop, setScrollTop] = useState(0);
	const containerRef = useRef();
	const itemsRef = useRef(new Map()); // 用于存储 DOM 节点
	// 1. 初始化位置信息（预估）
	const [positions, setPositions] = useState(() =>
		items.map((_, index) => ({
			index,
			height: estimatedHeight,
			top: index * estimatedHeight,
			bottom: (index + 1) * estimatedHeight,
		}))
	);

	// 总高度：取最后一项的 bottom
	const totalHeight = positions[positions.length - 1].bottom;

	// 2. 真实高度同步：当 DOM 渲染后，更新缓存
	useLayoutEffect(() => {
		let needUpdate = false;
		itemsRef.current.forEach((node, index) => {
			if (!node) return;
			const rect = node.getBoundingClientRect();
			const realHeight = rect.height;
			const oldHeight = positions[index].height;

			if (realHeight !== oldHeight) {
				needUpdate = true;
				const diff = oldHeight - realHeight;
				// 更新当前项及其后所有项的位置
				positions[index].height = realHeight;
				positions[index].bottom = positions[index].bottom - diff;
				for (let j = index + 1; j < positions.length; j++) {
					positions[j].top = positions[j - 1].bottom;
					positions[j].bottom = positions[j].bottom - diff;
				}
			}
		});

		if (needUpdate) {
			setPositions([...positions]); // 触发重绘
		}
	}, [scrollTop]); // 每次滚动后检查渲染项的高度

	// 3. 二分查找当前 scrollTop 对应的开始索引
	const findStartIndex = (scrollTop) => {
		let low = 0;
		let high = positions.length - 1;
		while (low <= high) {
			let middle = Math.floor((low + high) / 2);
			if (positions[middle].bottom === scrollTop) return middle + 1;
			if (positions[middle].bottom < scrollTop) low = middle + 1;
			else high = middle - 1;
		}
		return low;
	};
	const startIndex = Math.max(0, findStartIndex(scrollTop) - 2);
	const endIndex = Math.min(items.length, findStartIndex(scrollTop + containerHeight) + 2);

	const visibleData = items.slice(startIndex, endIndex);
	const offset = startIndex > 0 ? positions[startIndex - 1].bottom : 0;

	return (
		<div
			ref={containerRef}
			onScroll={(e) => setScrollTop(e.target.scrollTop)}
			style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
		>
			{/* 撑开滚动条 */}
			<div style={{ height: totalHeight, position: 'absolute', top: 0, left: 0, right: 0, zIndex: -1 }} />

			{/* 渲染列表 */}
			<div style={{ transform: `translate3d(0,${offset}px,0)` }}>
				{visibleData.map((item, index) => {
					const actualIndex = index + startIndex;
					return (
						<div
							key={item.id}
							ref={(el) => itemsRef.current.set(actualIndex, el)} // 记录 DOM
						>
							{item.content}
						</div>
					);
				})}
			</div>
		</div>
	);
};