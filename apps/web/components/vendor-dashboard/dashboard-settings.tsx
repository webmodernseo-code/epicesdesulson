export default function DashboardSettings() {
  return (
    <div className="menu-tab-pane" id="settings">
      <div className="mb-6">
        <h4 className="text-light-primary-text">Setting</h4>
      </div>
      <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto px-6 bg-white">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-300">
              <td>
                <div className="py-6">
                  <div className="flex items-center gap-x-2.5">
                    <span className="inline-flex items-center justify-center size-9 rounded-full bg-warning-light">
                      <i className="hgi hgi-stroke hgi-notification-01 text-[20px] leading-5 text-light-primary-text" />
                    </span>
                    <p className="font-semibold text-light-disabled-text">
                      Notification
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4 pl-11">
                    {[
                      "Show Desktop Notifications",
                      "Enable Notifications",
                      "Get notification for my own activity",
                      "DND",
                    ].map((label, idx) => (
                      <div key={idx}>
                        <label className="flex items-center cursor-pointer group">
                          <span className="has-[input:checked]:hover:bg-[#00AB55]/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                            <span className="relative inline-flex w-5 h-5 items-center justify-center">
                              <input
                                type="radio"
                                name="notification"
                                className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-primary border-gray-300 rounded-full bg-white transition-all"
                                defaultChecked={idx === 0}
                              />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all" />
                            </span>
                          </span>
                          <span className="text-light-primary-text text-sm leading-[22px]">
                            {label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td>
                <div className="py-6">
                  <div className="flex items-center gap-x-2.5">
                    <span className="inline-flex items-center justify-center size-9 rounded-full bg-warning-light">
                      <i className="hgi hgi-stroke hgi-user text-[20px] leading-5 text-light-primary-text" />
                    </span>
                    <p className="font-semibold text-light-disabled-text">
                      Deactivate Account
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4 pl-11">
                    {[
                      "I have a privacy concern",
                      "This is temporary",
                      "Other",
                      "DND",
                    ].map((label, idx) => (
                      <div key={idx}>
                        <label className="flex items-center cursor-pointer group">
                          <span className="has-[input:checked]:hover:bg-[#00AB55]/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                            <span className="relative inline-flex w-5 h-5 items-center justify-center">
                              <input
                                type="radio"
                                name="user"
                                className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-primary border-gray-300 rounded-full bg-white transition-all"
                                defaultChecked={idx === 0}
                              />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all" />
                            </span>
                          </span>
                          <span className="text-light-primary-text text-sm leading-[22px]">
                            {label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="py-6">
                  <div className="flex items-center gap-x-2.5">
                    <span className="inline-flex items-center justify-center size-9 rounded-full bg-warning-light">
                      <i className="hgi hgi-stroke hgi-delete-01 text-[20px] leading-5 text-light-primary-text" />
                    </span>
                    <p className="font-semibold text-light-disabled-text">
                      Delete Account
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4 pl-11">
                    {[
                      "No longer usable",
                      "Want to switch on other account",
                      "Other",
                    ].map((label, idx) => (
                      <div key={idx}>
                        <label className="flex items-center cursor-pointer group">
                          <span className="has-[input:checked]:hover:bg-[#00AB55]/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                            <span className="relative inline-flex w-5 h-5 items-center justify-center">
                              <input
                                type="radio"
                                name="account"
                                className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-primary border-gray-300 rounded-full bg-white transition-all"
                                defaultChecked={idx === 0}
                              />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all" />
                            </span>
                          </span>
                          <span className="text-light-primary-text text-sm leading-[22px]">
                            {label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
