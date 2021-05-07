import { useEffect, useState } from 'react';

function useClickOutside() {
  const [showGenMenu, setShowGenMenu] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(true);
  const [shownMenu, setShownMenu] = useState('');

  useEffect(() => {
    setShowGenMenu(clickedOutside ? false : true);
  }, [clickedOutside]);

  const toggleMenuShow = (e) => {
    setShowGenMenu((prev) => !prev);
    setClickedOutside((prev) => !prev);
    setShownMenu(e.target.id);
  };

  return [
    showGenMenu,
    clickedOutside,
    setClickedOutside,
    shownMenu,
    toggleMenuShow,
  ];
}

export default useClickOutside;
