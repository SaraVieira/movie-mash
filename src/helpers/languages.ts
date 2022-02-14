export const getFlagEmoji = (language) =>
  String.fromCodePoint(
    ...[...language.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt())
  );
