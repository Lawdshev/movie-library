import { CastMember } from "@/utils/types";
import React from "react";

interface IProps {
  cast: CastMember;
}

export default function CastCard({ cast }: IProps) {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const imageUrl = cast.profile_path
    ? `${BASE_IMAGE_URL}${cast.profile_path}`
    : "/default-profile.png"; 

  return (
    <div className="crew-card flex flex-col items-center text-center bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={cast.name}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-200"
      />
      <h2 className="text-base font-bold mt-3 text-gray-900">{cast.name}</h2>
      <p className="text-sm text-gray-600 mt-1">{cast.character}</p>
    </div>
  );
}
