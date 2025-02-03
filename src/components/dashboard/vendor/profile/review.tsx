"use client";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { api } from "@/trpc/react";
import { ButtonWithLoader } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type ReviewProps = {
  vendorId: string;
  isModal?: boolean;
  onClose?: () => void;
  vendorName?: string;
};

export default function VendorReview({
  isModal,
  onClose,
  vendorId,
  vendorName,
}: ReviewProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const createRating = api.vendor.rateVendor.useMutation({
    onSuccess: () => {
      // Reset form and show success message
      setRating(0);
      setComment("");
      toast({
        title: "Review submitted successfully",
        description: "Thank you for your feedback!",
      });

      if (isModal) {
        onClose?.();
      } else {
        router.back();
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRating.mutate({
      vendorId,
      rating,
      comment,
    });
  };

  return (
    <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Leave a Review {vendorName ? `for ${vendorName}` : ""}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl text-yellow-400"
              >
                {star <= (hoveredRating || rating) ? (
                  <FaStar size={32} />
                ) : (
                  <FaRegStar size={32} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Your Review (Optional)
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Share your experience with this vendor..."
          />
        </div>

        {/* Submit Button */}
        <ButtonWithLoader
          type="submit"
          disabled={!rating || createRating.isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          loading={createRating.isPending}
        >
          {createRating.isPending ? "Submitting..." : "Submit Review"}
        </ButtonWithLoader>
      </form>
    </div>
  );
}
