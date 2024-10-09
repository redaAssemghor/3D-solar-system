const FooterInfo = () => {
  return (
    <div className="bg-transparent z-40 relative">
      <div
        className="bg-cover bg-center h-40 w-full z-0 block"
        style={{
          backgroundImage: `url('/assets/footer-bg.png')`,
          margin: 0,
          padding: 0,
        }}
      ></div>
      <div
        className="bg-cover bg-center h-[435px] w-full z-0 block"
        style={{
          backgroundImage: `url('/assets/footer-bg-bot.jpg')`,
          margin: 0,
          padding: 0,
        }}
      ></div>
    </div>
  );
};

export default FooterInfo;
