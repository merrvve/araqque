"use client";

import { LuPlus } from "react-icons/lu";
import { Button, Clipboard } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function CreateHomeWork() {
  const [id, setId] = useState("Ödev No");

  function createId() {
    setId(uuidv4());
  }
  return (
    <div>
      <div className="grid w-full max-w-96 mb-3">
        <h1 className="text-2xl font-bold mb-5">Yeni Ödev No Oluştur</h1>
        <div className="relative">
          <label htmlFor="hw-name">Ödev Adı</label>
          <input
            id="hw-name"
            type="text"
            className="col-span-6 mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Ödev Adı"
          />
        </div>
        <div className="relative">
          <label htmlFor="hw-class">Sınıf</label>
          <input
            id="hw-class"
            type="text"
            className="col-span-6 mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Sınıflar"
          />
        </div>
        <div className="relative">
          <label htmlFor="hw-qa">Soru Sayısı</label>
          <input
            id="hw-qa"
            type="text"
            className="col-span-6 mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="9"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() => createId()}
            className="rounded-lg mb-3 border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 "
          >
            <LuPlus />
            Ödev Oluştur
          </button>
        </div>

        {/* <div className="relative">
          <label htmlFor="hw-id" className="sr-only">
            Label
          </label>
          <input
            id="hw-id"
            type="text"
            className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={id}
            disabled
            readOnly
          />
          <Clipboard.WithIconText valueToCopy={id} />
        </div> */}

      </div>
    </div>
  );
}
