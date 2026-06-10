import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    // Return empty array with a custom header indicating fallback mode
    return NextResponse.json(
      { data: [], mode: "fallback", reason: "INSTAGRAM_ACCESS_TOKEN is missing" },
      { status: 200 }
    );
  }

  try {
    const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
    const instagramUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;

    const response = await fetch(instagramUrl, {
      next: { revalidate: 3600 }, // Cache response for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Instagram API returned an error:", errorText);
      return NextResponse.json(
        { data: [], mode: "fallback", error: "Failed to fetch from Instagram API" },
        { status: 200 }
      );
    }

    const json = await response.json();
    
    // Map Instagram Graph API items to our client schema
    const formattedData = (json.data || []).map((item: any) => {
      const isVideo = item.media_type === "VIDEO" || item.media_type === "VIDEO_CLIP";
      return {
        id: item.id,
        type: isVideo ? "video" : "image",
        // For video posts, Graph API media_url is the video file, and thumbnail_url is the poster image.
        src: item.media_url,
        thumbnail: item.thumbnail_url || item.media_url,
        caption: item.caption || "",
        link: item.permalink || `https://www.instagram.com/p/${item.id}`,
      };
    });

    return NextResponse.json({ data: formattedData, mode: "live" }, { status: 200 });
  } catch (error) {
    console.error("Instagram route handler crashed:", error);
    return NextResponse.json(
      { data: [], mode: "fallback", error: "Internal server error" },
      { status: 200 }
    );
  }
}
