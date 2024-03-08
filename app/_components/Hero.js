import React from "react";
import Constant from "../_utils/Constant";
import Upload from "../(dashboard)/(routes)/_upload/page";
function Hero() {
  return (
    <section className="bg-gray-50 ">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <span className="text-primary">Upload, Save </span> and easily Share
            your files with your friends
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            {Constant.desc}
          </p>

          <Upload />
        </div>
      </div>
    </section>
  );
}

export default Hero;
