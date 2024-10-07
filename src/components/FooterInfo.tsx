const FooterInfo = () => {
  return (
    <div className="bg-black">
      <div
        className="bg-cover bg-center h-40 w-full z-0"
        style={{ backgroundImage: `url('/assets/footer-bg.png')` }}
      ></div>
      <div
        className="bg-cover bg-center h-[540px] w-full z-0 "
        style={{ backgroundImage: `url('/assets/footer-bg-bot.jpg')` }}
      ></div>
    </div>
  );
};

export default FooterInfo;
