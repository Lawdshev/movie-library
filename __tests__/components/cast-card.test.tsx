import { render } from "@testing-library/react";
import CastCard from "@/components/cast-card";
import { CastMember } from "@/utils/types";

describe("CastCard Component", () => {
  const mockCast: CastMember = {
    adult: false,
    cast_id: 1,
    character: "John Doe",
    credit_id: "123abc",
    gender: 1,
    id: 100,
    known_for_department: "Acting",
    name: "Jane Smith",
    order: 1,
    original_name: "Jane Smith",
    popularity: 50.5,
    profile_path: "/profile.jpg",
  };

  it("renders correctly with all data", () => {
    const { getByAltText, getByText } = render(<CastCard cast={mockCast} />);

    // Check the image
    const img = getByAltText("Jane Smith");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/profile.jpg"
    );

    // Check the name
    expect(getByText("Jane Smith")).toBeInTheDocument();

    // Check the character
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("renders default image when profile_path is null", () => {
    const castWithoutProfile: CastMember = { ...mockCast, profile_path: null };

    const { getByAltText } = render(<CastCard cast={castWithoutProfile} />);

    // Check the default image
    const img = getByAltText("Jane Smith");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/default-profile.png");
  });
});
