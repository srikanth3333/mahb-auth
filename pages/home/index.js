

export default function Home() {


    return (
      <>
          <div className="container">
            <div className="card my-4 shadow-custom border-radius-0">
              <div className="card-header py-3 px-4">
                    <div className="d-flex">
                      <h5 className="card-title mb-0">Speed Limit  Count</h5>
                      <div className="ms-5">
                        <img src="/icons/tabler_edit.png" alt="" />
                        <span className="edit-btn ms-1">Edit</span>
                      </div>
                    </div>
              </div>
              <div className="card-body px-4">
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit :</p>
                    <div className="d-flex align-items-center">
                      <input defaultValue="65" className="custom-input" />
                      <p className="ms-2">km/hr</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit Count :</p>
                    <input defaultValue="72" className="custom-input" />
                  </div>
              </div>
            </div>
            <div className="card shadow-custom border-radius-0">
              <div className="card-header py-3 px-4">
                    <div className="d-flex">
                      <h5 className="card-title mb-0">Auto ticket generation for bus breakdown</h5>
                      <div className="ms-5">
                        <img src="/icons/tabler_edit.png" alt="" />
                        <span className="edit-btn ms-1">Edit</span>
                      </div>
                    </div>
              </div>
              <div className="card-body px-4">
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Frist ticket Creation time:</p>
                    <div className="d-flex align-items-center">
                      <input defaultValue="65" className="custom-input" />
                      <p className="ms-2">min</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit Count :</p>
                    <input defaultValue="72" className="custom-input" />
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Second ticket Creation time:</p>
                    <div className="d-flex align-items-center">
                      <input defaultValue="65" className="custom-input" />
                      <p className="ms-2">hr</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit Count :</p>
                    <input defaultValue="72" className="custom-input" />
                  </div>
              </div>
            </div>
          </div>
      </>
    )
  }
  