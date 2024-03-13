import { Button } from "@/components/ui/button";
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <section className="flex items-center justify-center bg-background h-[80vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <h1 className="mt-8 font-extrabold tracking-tight text-3xl lg:text-6xl">
              Create Notes with ease
            </h1>

            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              Optimize your workflow with Notepod, the SAAS note app designed to simplify the management of your ideas and projects.
            </p>
          </div>

          <div className="flex- justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
             <Button size="lg">
               Sign Up For free
             </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
