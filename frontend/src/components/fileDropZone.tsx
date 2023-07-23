import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { presignFile } from "../hooks/poll/useUpdatePoll";

type Props = { onSave: (url: string, title: string) => void };

export const FileDropZone = ({ onSave }: Props) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDropFile = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach(async (file: File) => {
        const reader = new FileReader();

        reader.onabort = () => toast("file reading was aborted");
        reader.onerror = () => toast.error("file reading has failed");
        const url = await presignFile(file);
        onSave(url, file.name);
      });
    },
    [onSave]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDropFile,
    maxSize: 20 * 1024 * 1024, // Maximum file size: 20MB
    accept: {
      "text/*": [".docx", ".doc", ".pdf", ".txt"],
    },
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDropRejected(fileRejections) {
      handleDragLeave();
      const errMessage = fileRejections[0].errors[0].message;
      toast.error(
        errMessage ? errMessage : "File type must be text: docx, doc, pdf, txt"
      );
    },
  });
  return (
    <div className="mt-9">
      <h5 className="text-lg text-grayColor font-semibold">Upload</h5>
      <div
        {...getRootProps()}
        className={`flexCenter cursor-pointer flex-col py-10 mt-3 rounded-lg border border-dashed ${
          isDragActive
            ? "bg-blue-500/10 border-blue-500"
            : "border-[#ebebeb] bg-strokeColor/20"
        }`}
      >
        <input {...getInputProps()} />
        <button>
          <IconUpload color="orange" className="w-12 h-12" />
        </button>

        <span className="mt-5 text-grayColor text-sm md:text-base font-medium text-center max-w-[250px] md:max-w-[415px]">
          <span className="text-textColor underline">Click to upload</span> or
          drag and drop Up to 10 files like word, or PDF, and upto 20 MB each.
        </span>
      </div>
    </div>
  );
};

export const IconUpload = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <div>
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <path
          d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
