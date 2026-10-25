export default function AlbumCard({ album, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      
      <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-lg">
        <img
          src={album.cover}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-white text-center">
        {album.title}
      </h3>
    </div>
  );
}