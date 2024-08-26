export const toolOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "history",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline"],
    bold: { className: "custom-bold" },
    italic: { className: "custom-italic" },
    underline: { className: "custom-underline" },
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"],
  },
  fontSize: {
    options: [8, 10, 12, 14, 16, 18, 24, 36],
  },
  fontFamily: {
    options: ["Arial", "Georgia", "Tahoma", "Times New Roman", "Verdana"],
  },
  list: {
    inDropdown: true,
    options: ["unordered", "ordered"],
  },
  textAlign: {
    inDropdown: true,
    options: ["left", "center", "right", "justify"],
  },
  colorPicker: {
    colors: [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#673AB7",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
      "#9E9E9E",
      "#607D8B",
    ],
  },
  link: {
    inDropdown: true,
  },
  emoji: {
    emojis: ["😀", "😂", "😍", "😢", "😎", "😡"],
  },
};
