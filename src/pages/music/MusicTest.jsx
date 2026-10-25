import { useState } from "react";
import { albums } from "../components/music/albums";
import AlbumCard from "../components/music/AlbumCard";
import MusicModal from "./MusicModal";

export default function Music() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <section className="min-h-screen bg-zinc-950 p-10">
      <h1 className="text-white text-4xl font-bold mb-10 text-center">
        Music
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {albums.map(album => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}
      </div>

      <MusicModal
        album={selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
      />
    </section>
  );
}
