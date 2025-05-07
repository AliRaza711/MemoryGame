// src/data/themeCards.js
export const getCardsByTheme = (theme) => {
  switch (theme) {
    case "Sport":
      return [
        { id: 1, icon: "⚽" },
        { id: 2, icon: "🏀" },
        { id: 3, icon: "🎾" },
        { id: 4, icon: "🏓" },
        { id: 5, icon: "🥊" },
        { id: 6, icon: "🏈" },
        { id: 7, icon: "🏸" },
        { id: 8, icon: "🥌" },
      ];
    case "Flag":
      return [
        { id: 1, icon: "🇵🇰" },
        { id: 2, icon: "🇺🇸" },
        { id: 3, icon: "🇬🇧" },
        { id: 4, icon: "🇫🇷" },
        { id: 5, icon: "🇯🇵" },
        { id: 6, icon: "🇮🇳" },
        { id: 7, icon: "🇨🇳" },
        { id: 8, icon: "🇨🇦" },
      ];
    case "Technology":
      return [
        { id: 1, icon: "💻" },
        { id: 2, icon: "📱" },
        { id: 3, icon: "🖱️" },
        { id: 4, icon: "🖥️" },
        { id: 5, icon: "⌨️" },
        { id: 6, icon: "🎧" },
        { id: 7, icon: "📷" },
        { id: 8, icon: "🔌" },
      ];
    default:
      return [];
  }
};
