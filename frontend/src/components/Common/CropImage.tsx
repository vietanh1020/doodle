import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button, Modal } from "react-bootstrap";

type Props = {
  file: File;
  onClose: () => void;
  show: boolean;
};

export default function CropImage({ file, show, onClose }: Props) {
  const editorRef = useRef<any>(file);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const canvas = editorRef.current.getImage();

    canvas.toBlob(async (blob: Blob) => {
      const formData: FormData = new FormData();
      await formData.append("upload", blob, `vietanh.png`);
      // const { url: avtUrl } = await changeAvatar(formData);
    }, "image/png");
    onClose();
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Crop banner</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <AvatarEditor
          ref={editorRef}
          image={file}
          width={498}
          border={[0, 0]}
          height={200}
          color={[255, 255, 255, 0.75]} // RGBA
          scale={1}
          rotate={0}
        />
        <div className="text-center">
          <Button className=" my-1" variant="primary" onClick={handleSubmit}>
            Save Change
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
