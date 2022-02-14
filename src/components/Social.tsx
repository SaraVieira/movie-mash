import Tippy from "@tippyjs/react";
import { IMDb, Instagram, Twitter } from "./Icons";

const platforms = [
  {
    Icon: IMDb,
    tooltip: "IMBD",
    link: "https://www.imdb.com/title/",
    key: "imdbId",
  },
  {
    Icon: Instagram,
    tooltip: "Instagram",
    link: "https://www.instagram.com/",
    key: "instagramId",
  },
  {
    Icon: Twitter,
    tooltip: "Twitter",
    link: "https://www.twitter.com/",
    key: "twitterId",
  },
];

export const Social = ({ externalIds }) => {
  return (
    <div className="flex gap-4 items-center justify-center mb-8">
      {platforms.map(
        ({ Icon, ...platform }) =>
          externalIds[platform.key] && (
            <Tippy content={platform.tooltip}>
              <a
                target="_blank"
                rel="noreferrer"
                href={`${platform.link}${externalIds[platform.key]}/`}
                className="text-white opacity-50 hover:opacity-100"
              >
                <Icon className="w-5 " />
              </a>
            </Tippy>
          )
      )}
    </div>
  );
};
