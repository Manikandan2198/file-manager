const dummyFileSystem = {
    'ea278d3e246754e8da1163a8e6517c08': {
      type: 'folder',
      name: 'root',
      path: '/',
      size: 0,
      date: '2019-04-07',
      parentPath: null,
      parentID: null,
      children: [
        '8b5ede9f0ce35d5c67017c9909c6db40',
        'ee06a1a0dfe7895206de290785da2c6a'
      ]
    },
    '8b5ede9f0ce35d5c67017c9909c6db40': {
        type: 'folder',
        name: 'apps',
        size: 223,
        date: '2019-04-29',
        parentID: 'ea278d3e246754e8da1163a8e6517c08',
        parentPath: 'root/',
        path: 'root/apps/',
        children: [
            '9FDE21762E0054565B756CA454BF4F36'
        ]
      },
      'ee06a1a0dfe7895206de290785da2c6a': {
        type: 'folder',
        name: 'pictures',
        size: 23,
        date: '2019-04-29',
        parentID: 'ea278d3e246754e8da1163a8e6517c08',
        parentPath: 'root/',
        path: 'root/pictures/',
        children: []
      },
      '9FDE21762E0054565B756CA454BF4F36':{
        type: 'folder',
        name: 'vscode',
        size: 23,
        date: '2019-04-29',
        parentID: '8b5ede9f0ce35d5c67017c9909c6db40',
        parentPath: 'root/apps/',
        path: 'root/apps/vscode/',
        children: []
      }
  };
  
  const generatedummyFileSystem = () => {
    localStorage.setItem('fileSystem', JSON.stringify(dummyFileSystem));
    return dummyFileSystem;
  };
  
  export default generatedummyFileSystem;