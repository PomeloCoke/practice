import React, { useState } from 'react';

function MenuItem({ item, onItemSelected, selectedId }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
    onItemSelected(item);
  };

  return (
    <div style={{ paddingLeft: '10px' }}>
      <div
        style={{
          background: item.id === selectedId ? 'lightgray' : 'white',
          padding: '10px',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        {item.title}
      </div>
      {item.items &&
        expanded &&
        item.items.map(subItem => (
          <MenuItem
            key={subItem.id}
            item={subItem}
            onItemSelected={onItemSelected}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
}

const twoSum = function(nums, target) {
  let newNums = nums
  let arr = []
  for (let i = 0; i < nums.length; i++) {
      const start = nums[i]
      const end = target - start
      const idx = newNums.findIndex(item=>item === end)
      if (idx > -1 && idx != i) {
          arr = [i,idx]
          break
      }

  }
  return arr
};

function App() {
  twoSum([3,3],6)
  const [selectedId, setSelectedId] = useState(null);

  const menuItems = [
    {
      id: 1,
      title: 'Home',
      items: [
        { id: 2, title: 'Sub item 1' },
        { id: 3, title: 'Sub item 2', changeRoute: true }
      ]
    },
    { id: 4, title: 'About',items: [
      { id: 6, title: 'Sub item 1' },
      { id: 7, title: 'Sub item 2' }
    ] },
    { id: 5, title: 'Contact',changeRoute: true }
  ];

  const handleItemSelected = item => {
    setSelectedId(item.id);
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {menuItems.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          onItemSelected={handleItemSelected}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}

export default App;