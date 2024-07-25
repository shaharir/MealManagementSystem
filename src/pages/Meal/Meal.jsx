import "./CustomMeal/Meal.css";

const Meal = () => {
  return (
    <>
      <div className="container my-5">
        <h2 className="fw-bolder text-center mb-4">Meal</h2>
        <div className="card shadow mb-5">
          <div className="card-body">
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloribus quae molestiae non natus blanditiis labore aperiam eaque
              voluptate officiis? Accusamus porro dolorem minus aspernatur
              doloremque facilis reprehenderit in provident autem.
            </p>
          </div>
        </div>
        <h2 className="text-center mt-5 mb-4 fw-bolder">Gallery</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="Mealhover card shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
                alt="Meal 1"
                className="card-img-top meal-img"
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="Mealhover shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Meal 2"
                className="card-img-top meal-img"
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="Mealhover shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
                alt="Meal 3"
                className="card-img-top meal-img"
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="Mealhover shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Meal 4"
                className="card-img-top meal-img"
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="Mealhover shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
                alt="Meal 5"
                className="card-img-top meal-img"
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="Mealhover shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
                alt="Meal 6"
                className="card-img-top meal-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
