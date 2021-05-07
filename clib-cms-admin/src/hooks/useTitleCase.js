function useTitleCase() {
  const titleCase = (str) => {
    const words = str.split('_');
    const capitalized = words.map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1, word.length)
    );
    return capitalized.join(' ');
  };
  return { titleCase };
}

export default useTitleCase;
