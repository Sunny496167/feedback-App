
import React, { useState, useEffect } from 'react';
import './App.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    {
      name: 'Ashish Sharma',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
      date: '5 days ago',
      likes: 1,
      dislikes: 0,
    },
    {
      name: 'Ashish Sharma',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
      date: '5 days ago',
      likes: 3,
      dislikes: 1,
    },
  ]);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    const calculateOverallRating = () => {
      if (reviews.length === 0) return 0;
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / reviews.length).toFixed(1);
    };
    setOverallRating(calculateOverallRating());
  }, [reviews]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReviewSubmit = () => {
    if (review.trim()) {
      setReviews([
        ...reviews,
        {
          name: 'New User',
          rating: rating,
          text: review,
          date: 'just now',
          likes: 0,
          dislikes: 0,
        },
      ]);
      setReview('');
      setRating(0);
    }
  };

  const handleLike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
  };

  const handleDislike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].dislikes += 1;
    setReviews(updatedReviews);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">
            &#9733;
          </span>
        ))}
        {halfStar && (
          <span className="star half">
            &#9733;
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">
            &#9733;
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="feedback-container">
      <div className="feedback-section">
        <h2>Feedback<div className='rectangle box1'></div>
        <div className='rectangle box2'></div>
        <div className='rectangle box3'></div>
        </h2>
        <div className="feedback-img"><img src="image.svg" alt="svgfile" /></div>
        <div className="rating-section">
          <h3>How likely are you to rate our app?</h3>
          {[1, 2, 3, 4, 5].map((star) => (
            <span id="cont"
              key={star}
              className={`star ${rating >= star ? 'selected' : ''}`}
              onClick={() => handleRating(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div><img className='ExtraElement1' src="Ellipse1.png"/></div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
        />
        <button className='Submit' onClick={handleReviewSubmit}>Submit</button>
        <div><img className='ExtraElement2' src="Ellipse.png"/></div>
      </div>

      <div className="reviews-section">
        <h2>Customer <span>Review </span><img src="review.png" alt="pngfile"/>
        <div className='circle circle1'></div>
        <div className='circle circle2'></div>
        <div className='circle circle3'></div>
        </h2>
        <div className="overall-rating">
          <h3>OVERALL RATING</h3>
          <div className="stars">
            {renderStars(overallRating)}
          </div>
          <h1>{overallRating}</h1>
        </div>

        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <div className="review-header-left">
                <img src={`https://i.pravatar.cc/150?img=${index + 1}`} alt="avatar" />
                <div>
                  <h4>{review.name}</h4>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${review.rating >= star ? 'full' : 'empty'}`}>
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-header-right">
                <span>{review.date}</span>
              </div>
            </div>
            <p>{review.text}</p>
            <div className="review-footer">
              <div className="review-footer-left">
                <button onClick={() => handleLike(index)}><img src="like.png"/> <span>{review.likes}</span></button>
                <button onClick={() => handleDislike(index)}><img src="dont-like.png"/> <span>{review.dislikes}</span></button>
              </div>
              <div className="review-footer-right">
                <button>Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Feedback />
    </div>
  );
};

export default App;

