import React from "react";
import AsideBooks from "./AsideBooks";

export default function ReviewContent({ data }) {
  return (
    <div className="">
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-8 ">
            <div id="socialicons-sticky">
              <div id="entry-content" className="">
                <h1 className="text-center pb-5">
                  <strong>
                    Book Review: <em>{data?.title}</em>
                  </strong>{" "}
                </h1>

                <p className="text-center">Reviewed by {data?.reviwer}</p>

                <div className="d-flex align-items-center">
                  <figure className="m-auto  ">
                    <img
                      data-attachment-id="24469"
                      data-permalink={data?.imageSrc}
                      data-orig-file={data?.imageSrc}
                      data-orig-size="1650,2550"
                      data-comments-opened="1"
                      data-image-meta='{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}'
                      data-image-title="Neben-Cover-Project-front-jpg"
                      data-image-description=""
                      data-image-caption=""
                      data-medium-file={data?.imageSrc}
                      data-large-file={data?.imageSrc}
                      decoding="async"
                      loading="lazy"
                      src={data?.imageSrc}
                      alt=""
                      className="img-fluid"
                      width="517"
                      height="799"
                      sizes="(max-width: 517px) 100vw, 517px"
                      data-recalc-dims="1"
                    />
                  </figure>
                </div>

                <h2 className="text-center py-5 ">
                  <strong>
                    <em>{data?.title}</em>
                  </strong>
                  .
                </h2>
                <hr className="dark" />

                <p>{data?.desc}.&nbsp;</p>

                <p>.&nbsp;</p>

                <p>
                  <strong>Publisher: </strong>
                  <a
                    href="https://atmospherepress.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {data?.publisher}
                  </a>
                </p>

                <p>
                  <strong>Genre:</strong> Nonfiction / Philosophy
                </p>

                <p>
                  <strong>Print Length:</strong> 374 pages
                </p>

                <p>
                  <strong>ISBN: </strong>978-1639883592
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 ">
            {/* Aside Section 1 */}
            <div className="col-12 mb-5  border-top border-dark">
              <img
                className="mt-2 w-100 h-100"
                alt=""
                src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/books-of-the-month-1080-%C3%97-1080-px.png?w=1080&ssl=1"
              />
            </div>
            {/* Aside Section 2 */}
            <div className=" p-0 col-lg-12 mb-5 border-top border-dark">
              <div className="row mt-4">
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/Braiding-Sweetgrass.jpeg?w=647&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/world-as-we-knew-it.jpg?w=333&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/08/My-Volcano.jpeg?resize=751%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/03/Jerks.jpeg?resize=706%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2021/12/I-Will-Die-in-a-Foreign-Land-cover.jpg?resize=751%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2021/12/Where-We-Go-When-All-We-Were-Is-Gone.jpeg?resize=663%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/07/Oyerinde-Cover-Project-front-jpg.jpg?resize=662%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/04/dream-pop-origami.jpeg?resize=663%2C1024&ssl=1" />
                <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/When-i-was-the-wind.jpeg?resize=663%2C1024&ssl=1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
