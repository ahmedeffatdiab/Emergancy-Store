"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import api from "@/lib/axios";

export default function ProfileAvatar({
  imageUrl,
  onSuccess,
}: {
  imageUrl?: string;
  onSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router=useRouter();
  const {showPurchaseAlert}=usePurchaseAlert()
  async function handleUpload() {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    setLoading(true);
    try {
      const res = await api.post("/auth/changeProfileImage",form,{
    headers: {
      token: `Bearer ${localStorage.getItem("userToken")}`,
    },
  }
);
      if (res.data.message === "Image updated successfully!") {
        onSuccess();
        setShowButtons(false);
        setFile(null);
        localStorage.removeItem("userToken");
        router.push("/login")
        showPurchaseAlert("👍 Profile image updated successfully!");
      }
    } catch (err:unknown){
     if (err instanceof Error) {
        console.error("Upload error:", err.message);
      } else {
        console.error("Unknown error", err);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 py-6">
      <Image
        width={400}
        height={200}
        src={
          imageUrl
            ? `${imageUrl}?${Date.now()}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s"
        }
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />

      <Button
        onClick={() => setShowButtons(true)}
        variant="link"
        className="p-0 block text-blue-500 underline cursor-pointer"
      >
        Update Image
      </Button>

      {showButtons && (
        <>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} style={{ display: "none" }}/>
          <div className="flex items-center gap-2">
            <Button type="button" className="bg-blue-600" onClick={() => fileInputRef.current?.click()}>
              Choose File
            </Button>
            <span className="text-sm text-gray-600">
              {file ? file.name : "No file chosen"}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={handleUpload} disabled={!file || loading}>
              {loading ? "Uploading..." : "Save"}
            </Button>
            <Button onClick={() => { setShowButtons(false); setFile(null) }} variant="destructive" >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
