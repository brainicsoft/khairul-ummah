"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });
import "react-multi-carousel/lib/styles.css";

export default function Carosel({ responsive, items }) {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {items.map((fund) => (
        <div
          key={fund.id}
          className="bg-white shadow-md mb-3 rounded-xl overflow-hidden flex flex-col mx-2"
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={fund.image || "/placeholder.svg"}
              alt={fund.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">{fund.title}</h3>
              <p className="text-muted-foreground mb-4">{fund.desc}</p>
            </div>

            <Link href={`/donate/${fund.slug}`}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition w-full">
                দান করুন
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
