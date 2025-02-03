import newsLetterBg from "~/public/img/newsletter-bg.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function JoinNewsLetter() {
  return (
    <div className="px-4 max-w-full">
    <div
      className=" max-w-full h-full md:h-[400px] lg:h-[450px] xl:h-[490px] 2xl:h-[604px] lg:max-w-[84%] mx-auto rounded-[20px] my-6 flex flex-col items-center py-9 px-2 justify-center"
      style={{
        backgroundImage: `url(${newsLetterBg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex h-full w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="satoshi my-4 w-fit rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#FFFEF8] to-[#EBF2FF] px-5 py-2 text-sm font-bold text-[#4C4C4C] shadow">
            <p>Stay in the Loop 📧</p>
          </div>
          <h1 className="dm_sans text-4xl lg:text-[49.6px] font-bold text-white py-4 text-center">
            Get event planning tips and updates
          </h1>
          <p className=" text-lg lg:text-xl font-normal text-[#F7FBFF] text-center">
            Sign up to receive event planning tips, special offers, and product
            updates from EventGizmo.
          </p>
          <div className="mx-auto flex flex-col sm:flex-row w-full max-w-xl items-center gap-3  my-4 rounded-[10px] bg-[#FAFCFF] px-5 py-4">
            <Input
              type="email"
              placeholder="Enter your email address "
              className="satoshi flex w-full flex-1 border-none rounded-none focus:bg-transparent active:bg-transparent bg-transparent p-2 text-base text-[#999999]"
            />
            <Button className="w-full flex-1 sm:min-w-[101px] bg-gradient-to-r from-[#136ADF] to-[#237DF6] px-4 py-3 text-center text-white">
              Join Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}
