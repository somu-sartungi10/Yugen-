
export const Ranime_card = ({R_Anime}) => {
  return (
    <div className="r-card flex h-fit bg-card-bg  rounded-lg">
            <div className="relative">
            {R_Anime?.images?.jpg?.image_url && (
              <img
                className="h-[400px] w-[300px] rounded-"
                src={R_Anime.images.jpg.image_url}
                alt={R_Anime.title}
              />
            )}
            <div className="py-2 font-body w-fit absolute text-sm rounded-md left-2 top-2 px-3 bg-secondary text-text">
              {R_Anime.type}
            </div>
            </div>


            <div className="w-80 p-4 flex flex-col gap-2 h-fit">

              <div className="text-text font-extrabold text-xl font-heading">
                {R_Anime?.title}
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(R_Anime?.genres) &&
                  R_Anime.genres.map((genre) => (
                    <div
                      key={genre.mal_id}
                      className="p-2 text-xs font-body bg-accent text-background w-fit rounded-lg"
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>


              <p className=" font-body text-sm text-text line-clamp-[14]">
                {R_Anime?.synopsis || "No synopsis available."}
              </p>

            </div>
          </div>
  )
}
