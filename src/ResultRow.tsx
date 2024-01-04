import playbisLogo from "./assets/paybis.png";

type ResultRowProps = {
  loading?: boolean;
  providerName?: string;
  btc?: string;
};

type logo = {
  source: string;
  invert?: boolean;
};

const logos: { [keys: string]: logo } = {
  paybis: { source: playbisLogo, invert: true },
  guardarian: { source: "https://guardarian.com/main-logo.svg" },
  transak: {
    source: "https://assets.transak.com/images/website/transak-logo-white.svg",
  },
  moonpay: { source: "https://www.moonpay.com/assets/logo-full-white.svg" },
};

export default function ResulRow({
  loading,
  providerName,
  btc,
}: ResultRowProps) {
  // console.log(providerName);
  let url = `http://${providerName}.com`;
  if(providerName === 'guardarian') url += '/buy-btc'
  return (
    <div className="relative border min-h-[64px] border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden">
      <a href={url} target="_blank">
        <div className="flex gap-4">
          {providerName && (
            <div className="grow items-center flex">
              <img
                src={logos[providerName].source}
                alt="logo"
                className={
                  "h-8 " + (logos[providerName]?.invert ? "invert" : "")
                }
              />
            </div>
          )}
          {btc && (
            <div className="flex gap-2">
              <span className="text-xl text-purple-200/80">
                {new Intl.NumberFormat("sv-SE", {
                  minimumFractionDigits: 8,
                }).format(parseFloat(btc))}
              </span>
              <span className="text-xl text-purple-300/50">BTC</span>
            </div>
          )}
        </div>
        {loading && (
          <div className="bg-gradient-to-r from-transparent via-blue-800 to-transparent inset-0 absolute skeleton-animation border-t border-white/25"></div>
        )}
      </a>
    </div>
  );
}
