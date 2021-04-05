const WindowTitle = props => {
  if (document.title !== props.title) {
    document.title = props.title;
  }
  return props.title;
};

export default WindowTitle;
