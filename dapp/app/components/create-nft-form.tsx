"use client";

import { Bitcoin, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function CreateNFTForm() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
      "video/mp4": [".mp4"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
  });

  return (
    <div className="relative min-h-full rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 overflow-hidden">
        <img
    src="/Frame 1.png" // Replace with your actual image path
    alt="Background"
    className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0 animate-float-slow "
  />
      <div className=" p-4">
        <div className="mb-6 mt-9 flex justify-center items-center gap-2">
          <Bitcoin className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Create an NFT</h1>
        </div>
        <p className="mb-8 text-sm text-gray-700">
          Once your item is minted you will not be able to change any of its
          information.
        </p>

        <div
          {...getRootProps()}
          className="mb-8 cursor-pointer rounded-xl text-slate-950 bg-white/80 p-8 text-center"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-2 h-6 w-6" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>Drag and drop media</p>
              <p className="text-sm text-gray-500">Browse files</p>
              <p className="mt-2 text-xs text-gray-400">
                Max size: 50MB
                <br />
                JPG, PNG, GIF, SVG, MP4
              </p>
            </>
          )}
        </div>
        <div className=" flex flex-col  space-y-6">
          <div>
            <label className="mb-2 block font-medium">Name</label>
            <input type="text" className="bg-white/80 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block font-medium">Description</label>
            <input className="min-h-48 w-full bg-white/80 rounded-2xl" />
          </div>
        </div>

        
      </div>
    </div>
  );
}
