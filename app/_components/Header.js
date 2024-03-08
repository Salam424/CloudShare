import Image from "next/image";
function Header() {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
          <Image src="/logo.png" width={190} height={140} alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default Header;
