import Image from "next/image";

export default function BlogPostDetails() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="blog-details-image h-[760px] w-full rounded-5xl relative overflow-hidden">
          <Image
            src="/images/blog/blog-details.jpg"
            alt="blog-details"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="blog-details-title-and-meta grid grid-cols-12 md:-translate-y-1/2 py-6">
          <div className="lg:col-span-10 lg:col-start-2 lg:col-end-12 col-span-12 text-center md:pt-6 md:px-6 md:pb-4 p-4 rounded-3xl bg-[#FFEB69]">
            <h6 className="text-primary category-name">Category Name</h6>
            <h3 className="my-4 blog-details-title">
              Why Online Shopping Is the Future of Retail
            </h3>
            <div className="blog-details-meta flex gap-y-6 md:gap-y-0 flex-col md:flex-row items-center justify-center">
              <div className="blog-details-meta-item flex items-center gap-x-2 relative md:after:absolute md:after:h-4 md:after:w-px md:after:bg-[rgba(145,158,171,0.24)] md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:pr-4">
                <i className="hgi hgi-stroke hgi-user text-2xl leading-6" />
                <span className="text-light-primary-text">By John Doe</span>
              </div>
              <div className="blog-details-meta-item flex items-center gap-x-2 relative md:after:absolute md:after:h-4 md:after:w-px md:after:bg-[rgba(145,158,171,0.24)] md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:pr-4 md:pl-4">
                <i className="hgi hgi-stroke hgi-calendar-03 text-2xl leading-6" />
                <span className="text-light-primary-text">09 Feb 2027</span>
              </div>
              <div className="blog-details-meta-item flex items-center gap-x-2 md:pl-4">
                <i className="hgi hgi-stroke hgi-chatting-01 text-2xl leading-6" />
                <span className="text-light-primary-text">(10)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-details-content grid grid-cols-12 mb-10">
          <div className="xl:col-span-8 xl:col-start-3 xl:col-end-11 col-span-12">
            <p className="mb-6">
              So you have heard about this site or you have been to it, but you
              cannot figure out what it is or what it can do. MTA web directory
              is the simplest way in which one can bid on a link, or a few links
              if they wish to do so. The link directory on MTA displays all of
              the links it currently has, and does so in alphabetical order,
              which makes it much easier for someone to find what they are
              looking for if it is something specific and they do not want to go
              through all the other sites and links as well. It allows you to
              start your bid at the bottom and slowly work your way to the top
              of the list.
            </p>
            <p>
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
            <hr className="my-6 border-[rgba(145,158,171,0.24)]" />
            <h4 className="mb-6">
              Trending Products You Need to Try This Season
            </h4>
            <p className="mb-6">
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-6 lg:gap-y-6 mb-6 gap-x-6">
              <div className="col-span-1">
                <Image
                  src="/images/home-3/mango-juice-bg.png"
                  alt="Blog Details Image"
                  width={600}
                  height={450}
                  className="rounded-3xl object-cover h-full w-full"
                />
              </div>
              <div className="col-span-1">
                <Image
                  src="/images/home-3/strawberry-yogurt.png"
                  alt="Blog Details Image"
                  width={600}
                  height={450}
                  className="rounded-3xl object-cover h-full w-full"
                />
              </div>
            </div>
            <p className="mb-6">
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
            <p className="mb-6">
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
            <div className="quote-block rounded-3xl bg-[rgba(255,235,105,1)] flex items-center justify-center mb-6">
              <div className="quote-block-content lg:py-20 lg:px-[160px] text-center p-10">
                <p className="text-2xl leading-9 font-bold text-light-primary-text">
                  “ The popularity of the links that are listed in the MTA
                  directory is in fact one of the most important factors in the
                  performance of the search engine. “
                </p>
              </div>
            </div>
            <h4 className="mb-6">
              Essential Guide to Finding the Best Deals Online
            </h4>
            <p className="mb-6">
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
            <p>
              It is important that you buy links because the links are what get
              you the results that you want. The popularity of the links that
              are listed in the MTA directory is in fact one of the most
              important factors in the performance of the search engine. Links
              are important and this is why you have to purchase a link in order
              to bid on something and the best part is that a link will only
              cost you $1, which is nothing compared to what you would pay if
              you decided to do it through any other company or website.
            </p>
          </div>
        </div>
        <div className="blog-details-action grid grid-cols-12 mb-[70px]">
          <div className="md:flex md:items-center md:justify-between md:gap-x-4 bg-gray-200 rounded-3xl p-6 xl:col-span-8 xl:col-start-3 xl:col-end-11 col-span-12">
            <div className="blog-tags flex items-center gap-x-2 md:mb-0 mb-6 flex-wrap md:flex-nowrap gap-y-2 md:gap-y-0">
              <a
                href="#"
                className="blog-tag text-light-primary-text text-sm leading-[22px] bg-white rounded-[50px] px-3 py-[5px] hover:bg-primary hover:text-white transition-all duration-300"
              >
                Best Sellers
              </a>
              <a
                href="#"
                className="blog-tag text-light-primary-text text-sm leading-[22px] bg-white rounded-[50px] px-3 py-[5px] hover:bg-primary hover:text-white transition-all duration-300"
              >
                Trends
              </a>
              <a
                href="#"
                className="blog-tag text-light-primary-text text-sm leading-[22px] bg-white rounded-[50px] px-3 py-[5px] hover:bg-primary hover:text-white transition-all duration-300"
              >
                Trending Now
              </a>
              <a
                href="#"
                className="blog-tag text-light-primary-text text-sm leading-[22px] bg-white rounded-[50px] px-3 py-[5px] hover:bg-primary hover:text-white transition-all duration-300"
              >
                New Arrivals
              </a>
            </div>
            <div className="blog-share flex items-center gap-x-4">
              <a
                href="#"
                className="blog-share-icon size-8 border border-gray-300 inline-flex justify-center items-center rounded-full bg-white"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5925 2.59357C12.5925 2.38902 12.4267 2.2232 12.2221 2.2232H10.3703C8.42901 2.1265 6.77417 3.61586 6.66656 5.55654V7.55654H4.81471C4.61016 7.55654 4.44434 7.72236 4.44434 7.92691V9.85283C4.44434 10.0574 4.61016 10.2232 4.81471 10.2232H6.66656V15.1862C6.66656 15.3907 6.83238 15.5565 7.03693 15.5565H9.25915C9.4637 15.5565 9.62952 15.3907 9.62952 15.1862V10.2232H11.5703C11.7397 10.2256 11.8892 10.1128 11.9332 9.94913L12.4666 8.0232C12.4964 7.91229 12.4731 7.7938 12.4035 7.70244C12.3339 7.61108 12.2259 7.55718 12.111 7.55654H9.62952V5.55654C9.6677 5.17661 9.98843 4.88796 10.3703 4.88987H12.2221C12.4267 4.88987 12.5925 4.72405 12.5925 4.5195V2.59357Z"
                    fill="#1877F2"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="blog-share-icon size-8 border border-gray-300 inline-flex justify-center items-center rounded-full bg-white"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.88867 1.48438C10.9 1.48438 11.1526 1.49351 11.9424 1.5293C13.1466 1.58423 14.204 1.87891 15.0527 2.72754C15.9018 3.57661 16.197 4.63419 16.252 5.83789C16.2877 6.62789 16.2959 6.88015 16.2959 8.8916C16.2959 10.9029 16.2877 11.1556 16.252 11.9453C16.197 13.1496 15.9015 14.2069 15.0527 15.0557C14.2037 15.9047 13.1458 16.1999 11.9424 16.2549C11.1526 16.2907 10.9 16.2988 8.88867 16.2988C6.87722 16.2988 6.62496 16.2907 5.83496 16.2549C4.63064 16.1999 3.57337 15.9044 2.72461 15.0557C1.87567 14.2066 1.5813 13.1489 1.52637 11.9453C1.49058 11.1556 1.48145 10.9029 1.48145 8.8916C1.48145 6.88012 1.49057 6.62791 1.52637 5.83789C1.58131 4.63357 1.87584 3.5763 2.72461 2.72754C3.57368 1.87847 4.63126 1.58424 5.83496 1.5293C6.62498 1.4935 6.87719 1.48438 8.88867 1.48438ZM8.88867 3.95312C7.54814 3.95313 7.37918 3.95836 6.85254 3.98242C6.05022 4.01919 5.34526 4.21657 4.7793 4.78223C4.21364 5.34788 4.01626 6.05284 3.97949 6.85547C3.95543 7.38211 3.9502 7.55107 3.9502 8.8916C3.9502 10.2321 3.95544 10.4012 3.97949 10.9277C4.01624 11.7299 4.2139 12.435 4.7793 13.001C5.34491 13.5665 6.05003 13.763 6.85254 13.7998C7.3792 13.8239 7.54812 13.8301 8.88867 13.8301C10.2292 13.8301 10.3983 13.8239 10.9248 13.7998C11.7272 13.763 12.4321 13.5667 12.998 13.001C13.5637 12.4353 13.7601 11.7304 13.7969 10.9277C13.8209 10.4012 13.8271 10.2322 13.8271 8.8916C13.8271 7.55105 13.8209 7.38213 13.7969 6.85547C13.7601 6.05326 13.5635 5.34815 12.998 4.78223C12.4324 4.21683 11.7273 4.01917 10.9248 3.98242C10.3983 3.95836 10.2292 3.95313 8.88867 3.95312ZM8.88867 4.84277C10.2066 4.84277 10.3635 4.84832 10.8838 4.87207C11.4456 4.89768 11.968 5.01021 12.3691 5.41113C12.7701 5.81224 12.8826 6.3347 12.9082 6.89648C12.9319 7.41675 12.9365 7.57382 12.9365 8.8916C12.9365 10.2096 12.932 10.3664 12.9082 10.8867C12.8826 11.4488 12.7704 11.9708 12.3691 12.3721C11.9679 12.7733 11.4458 12.8855 10.8838 12.9111C10.3635 12.9349 10.2067 12.9395 8.88867 12.9395C7.57089 12.9395 7.41382 12.9349 6.89355 12.9111C6.33177 12.8855 5.80931 12.773 5.4082 12.3721C5.00728 11.9709 4.89475 11.4486 4.86914 10.8867C4.84539 10.3664 4.83984 10.2096 4.83984 8.8916C4.83984 7.57381 4.84539 7.41676 4.86914 6.89648C4.89479 6.33459 5.00706 5.81228 5.4082 5.41113C5.80935 5.00999 6.33166 4.89772 6.89355 4.87207C7.41383 4.84832 7.57088 4.84277 8.88867 4.84277ZM8.88965 6.35645C7.48903 6.35645 6.35352 7.49227 6.35352 8.89258C6.35395 10.2925 7.4896 11.4277 8.88965 11.4277C10.2893 11.4273 11.4244 10.2923 11.4248 8.89258C11.4248 7.49253 10.2899 6.35688 8.88965 6.35645ZM8.88965 7.24609C9.79854 7.24652 10.5352 7.98389 10.5352 8.89258C10.5347 9.80121 9.79828 10.5377 8.88965 10.5381C7.98065 10.5381 7.24359 9.80116 7.24316 8.89258C7.24316 7.98332 7.9807 7.24609 8.88965 7.24609ZM11.5254 5.66309C11.1981 5.66309 10.9326 5.92858 10.9326 6.25586C10.9327 6.58305 11.1982 6.84863 11.5254 6.84863C11.8524 6.8484 12.1171 6.58291 12.1172 6.25586C12.1172 5.92872 11.8525 5.66332 11.5254 5.66309Z"
                    fill="#E02D69"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="blog-share-icon size-8 border border-gray-300 inline-flex justify-center items-center rounded-full bg-white"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.223 6.21878C10.0764 6.21484 8.97524 6.66707 8.16237 7.47577C7.34949 8.28448 6.89161 9.38326 6.88965 10.5299V14.8854C6.88965 15.0623 6.95989 15.2318 7.08491 15.3568C7.20993 15.4819 7.3795 15.5521 7.55632 15.5521H9.11187C9.48006 15.5521 9.77854 15.2536 9.77854 14.8854V10.5299C9.77824 10.1215 9.95172 9.73228 10.2556 9.45947C10.5595 9.18667 10.9651 9.05605 11.3711 9.10026C12.1163 9.19411 12.6733 9.83072 12.6674 10.5817V14.8854C12.6674 15.2536 12.9659 15.5521 13.3341 15.5521H14.8896C15.2578 15.5521 15.5563 15.2536 15.5563 14.8854V10.5299C15.5544 9.38326 15.0965 8.28448 14.2836 7.47577C13.4707 6.66707 12.3696 6.21484 11.223 6.21878Z"
                    fill="#007EBB"
                  />
                  <rect
                    x="2.22266"
                    y="6.88281"
                    width="3.33333"
                    height="8.66667"
                    rx="0.9"
                    fill="#007EBB"
                  />
                  <circle
                    cx="3.88932"
                    cy="3.88542"
                    r="1.66667"
                    fill="#007EBB"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="blog-share-icon size-8 border border-gray-300 inline-flex justify-center items-center rounded-full bg-white"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.98491 14.8183C8.1978 14.8923 10.3466 14.0683 11.9426 12.5337C13.5386 10.9991 14.4462 8.88423 14.459 6.67014C14.9609 6.04896 15.3337 5.33371 15.5553 4.56643C15.5891 4.4426 15.547 4.31047 15.4479 4.22893C15.3488 4.14738 15.211 4.13162 15.096 4.18866C14.5575 4.44786 13.9137 4.3346 13.496 3.90717C12.9707 3.33186 12.2347 2.99381 11.456 2.97009C10.6772 2.94636 9.9221 3.23899 9.36268 3.78125C8.59155 4.52806 8.26826 5.62441 8.51083 6.67014C6.02935 6.81828 4.32565 5.64051 2.96268 4.02569C2.87902 3.93094 2.74724 3.89463 2.62685 3.93316C2.50646 3.97168 2.42025 4.07775 2.40713 4.20347C1.87536 7.15322 3.23444 10.1225 5.81454 11.6479C4.96982 12.6167 3.78358 13.2217 2.50343 13.3368C2.36282 13.3601 2.25259 13.4703 2.22916 13.6108C2.20573 13.7514 2.27428 13.8914 2.39972 13.959C3.51344 14.5156 4.73989 14.8095 5.98491 14.8183Z"
                    fill="#00AAEC"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="comments-area grid grid-cols-12">
          <div className="xl:col-span-8 xl:col-start-3 xl:col-end-11 col-span-12">
            <div className="flex items-center justify-between lg:mx-10 pb-10 border-b border-gray-300">
              <h5>Comments</h5>
              <div className="relative min-w-[100px]">
                <select id="sorting" className="filter-select label">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="relevance">Relevance</option>
                  <option value="comment-count">Comment Count</option>
                </select>
                <label htmlFor="sorting" className="nice-select-label">
                  Sorting
                </label>
              </div>
            </div>
            <ol className="comment-list mt-10 lg:px-10 mb-[70px]">
              <li className="comment">
                <div className="comment-body">
                  <div className="comment-meta">
                    <div className="comment-author-avatar size-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/blog/user-avatar-1.png"
                        alt="Comment Author Avatar"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="comment-metadata flex-1">
                      <p className="comment-author font-semibold text-light-primary-text mb-1">
                        Robert Fox
                      </p>
                      <p className="comment-date text-sm leading-[22px]">
                        12:40PM, 14 Nov, 2026
                      </p>
                    </div>
                  </div>
                  <div className="comment-content">
                    <p className="text-sm leading-[22px]">
                      Very nice ! On the other hand, we denounce with righteous
                      indignation and dislike men who are so beguiled and
                      demoralized by the
                    </p>
                  </div>
                  <div className="comment-reply">
                    <a href="#" className="comment-reply-link">
                      Reply
                    </a>
                  </div>
                </div>
                <ol className="children">
                  <li className="comment">
                    <div className="comment-body">
                      <div className="comment-meta">
                        <div className="comment-author-avatar size-12 rounded-full overflow-hidden shrink-0">
                          <Image
                            src="/images/blog/user-avatar-1.png"
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="comment-metadata flex-1">
                          <p className="comment-author font-semibold text-light-primary-text mb-1">
                            Robert Fox
                          </p>
                          <p className="comment-date text-sm leading-[22px]">
                            12:40PM, 14 Nov, 2026
                          </p>
                        </div>
                      </div>
                      <div className="comment-content">
                        <p className="text-sm leading-[22px]">
                          Very nice ! On the other hand, we denounce with
                          righteous indignation and dislike men who are so
                          beguiled and demoralized by the
                        </p>
                      </div>
                      <div className="comment-reply">
                        <a href="#" className="comment-reply-link">
                          Reply
                        </a>
                      </div>
                    </div>
                  </li>
                </ol>
              </li>
              <li className="comment">
                <div className="comment-body">
                  <div className="comment-meta">
                    <div className="comment-author-avatar size-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/blog/user-avatar-1.png"
                        alt="Comment Author Avatar"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="comment-metadata flex-1">
                      <p className="comment-author font-semibold text-light-primary-text mb-1">
                        Robert Fox
                      </p>
                      <p className="comment-date text-sm leading-[22px]">
                        12:40PM, 14 Nov, 2026
                      </p>
                    </div>
                  </div>
                  <div className="comment-content">
                    <p className="text-sm leading-[22px]">
                      Very nice ! On the other hand, we denounce with righteous
                      indignation and dislike men who are so beguiled and
                      demoralized by the
                    </p>
                  </div>
                  <div className="comment-reply">
                    <a href="#" className="comment-reply-link">
                      Reply
                    </a>
                  </div>
                </div>
                <ol className="children">
                  <li className="comment">
                    <div className="comment-body">
                      <div className="comment-meta">
                        <div className="comment-author-avatar size-12 rounded-full overflow-hidden shrink-0">
                          <Image
                            src="/images/blog/user-avatar-1.png"
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="comment-metadata flex-1">
                          <p className="comment-author font-semibold text-light-primary-text mb-1">
                            Robert Fox
                          </p>
                          <p className="comment-date text-sm leading-[22px]">
                            12:40PM, 14 Nov, 2026
                          </p>
                        </div>
                      </div>
                      <div className="comment-content">
                        <p className="text-sm leading-[22px]">
                          Very nice ! On the other hand, we denounce with
                          righteous indignation and dislike men who are so
                          beguiled and demoralized by the
                        </p>
                      </div>
                      <div className="comment-reply">
                        <a href="#" className="comment-reply-link">
                          Reply
                        </a>
                      </div>
                    </div>
                  </li>
                </ol>
              </li>
            </ol>
            <div className="comment-respond border border-gray-300 rounded-3xl p-6">
              <h5 className="mb-6">Add Comment</h5>
              <form className="comment-form flex flex-col gap-y-6" action="#">
                <div className="input-group medium rounded-[20px] px-3.5 resize-none">
                  <textarea
                    id="post_comment"
                    rows={4}
                    className="peer form-control placeholder-transparent focus:placeholder-transparent"
                    placeholder="Comment *"
                    defaultValue={""}
                  />
                  <label
                    htmlFor="post_comment"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Comment *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Name *"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Name *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="email"
                    id="personal_email"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Email *"
                  />
                  <label
                    htmlFor="personal_email"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Email *
                  </label>
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-primary btn-large rounded-[100px] py-[11px]">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
