import bookmarks from '../input/bookmarks.json' assert { type: 'json' };
let addedBookmarks = [];
let bookmarkId = 1;
bookmarks.forEach((bookmark, parentIndex) => {
	let parentUID = `${bookmarkId++}TMP`;
	let title = parentIndex != 0 ? `${parentIndex}. ` : '';
	title += bookmark.index.split('/')[0];
	let page = Number(bookmark.index.split('/')[1]);
	let level = 1;
	let parentId = 'ROOT';
	addedBookmarks.push({
		id: parentUID,
		title,
		page,
		level,
		parentId,
		index: parentIndex
	});
	if (bookmark.children) {
		bookmark.children.forEach((child, childIndex) => {
			let id = `${bookmarkId++}TMP`;
			title = `${parentIndex}.${childIndex + 1} - `;
			title += child.split('/')[0];
			page = Number(child.split('/')[1]);
			level = 2;
			addedBookmarks.push({
				id,
				title,
				page,
				level,
				parentId: parentUID,
				index: childIndex
			});
		});
	}
});
export const taskPayload = {
	addedBookmarks,
	deletedBookmarks: [],
	type: 'editBookmarks',
	updatedBookmarks: []
};

// let example = [
// 	{
// 		id: '1TMP',
// 		title: 'Chapter 1',
// 		page: 1,
// 		level: 1,
// 		parentId: 'ROOT',
// 		index: 0
// 	},
// 	{
// 		id: '2TMP',
// 		title: '1.1',
// 		page: 1,
// 		level: 2,
// 		parentId: '1TMP',
// 		index: 0
// 	},
// 	{
// 		id: '3TMP',
// 		title: 'Chapter 2',
// 		page: 3,
// 		level: 1,
// 		parentId: 'ROOT',
// 		index: 1
// 	},
// 	{
// 		id: '4TMP',
// 		title: '2.1',
// 		page: 4,
// 		level: 2,
// 		parentId: '3TMP',
// 		index: 0
// 	}
// ];
