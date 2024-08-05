import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./LiquorSalesAnalysis.css";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
import image9 from "./images/image9.png";
import image11 from "./images/image11.png";
import image12 from "./images/image12.png";
import image13 from "./images/image13.png";

const LiquorSalesAnalysis = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [activeViz, setActiveViz] = useState(null);

  const images = [
    {
      id: 1,
      src: image1,
      alt: "Image 1",
      link: "https://va.rajasthan.gov.in/views/LiquorSalesAnalysis/LiquorSalesDashbord?%3Aembed=y&%3AisGuestRedirectFromVizportal=y",
    },
    {
      id: 2,
      src: image2,
      alt: "Image 2",
      link: "https://va.rajasthan.gov.in/views/LiquorRevenueAnalysis/LiquorRevenueanalysisdashboard",
    },
    {
      id: 3,
      src: image3,
      alt: "Image 3",
      link: "https://va.rajasthan.gov.in/views/LiquorProductionAnalysis/LiquorProductionAnalysis",
    },
    {
      id: 4,
      src: image4,
      alt: "Image 4",
      link: "https://va.rajasthan.gov.in/views/ShopSaleAnalysis/ShopAnalysis",
    },
    {
      id: 5,
      src: image5,
      alt: "Image 5",
      link: "https://va.rajasthan.gov.in/views/LiquorSupplyAnalysis/LiquorSupplyAnalysis",
    },
    {
      id: 6,
      src: image6,
      alt: "Image 6",
      link: "https://va.rajasthan.gov.in/views/ActualSalesvsPridictionSalesAnalysis/SalesPredictionAnalysis",
    },
    {
      id: 7,
      src: image7,
      alt: "Image 7",
      link: "https://va.rajasthan.gov.in/views/GuaranteeAnalysis/GeographicalShopsClustering",
    },
    {
      id: 8,
      src: image8,
      alt: "Image 8",
      link: "https://va.rajasthan.gov.in/views/BrandSalesandStockanalysis_17156673105580/SalesvsStockanalysis",
    },
    {
      id: 9,
      src: image9,
      alt: "Image 9",
      link: "https://va.rajasthan.gov.in/views/DepotStockAnalysis/BrandStockAnalysis",
    },
    { id: 11, src: image11, alt: "Image 11" },
    {
      id: 12,
      src: image12,
      alt: "Image 12",
      link: "https://va.rajasthan.gov.in/views/WhatifAnalysisDashboard/BEERWhatifAnalysis",
    },
    { id: 13, src: image13, alt: "Image 13" },
  ];

  // Filter images based on the user ID
  const filteredImages = images.filter((image) => {
    if (userId === 1) {
      return image.id === 1 || image.id === 2;
    } else if (userId === 2) {
      return image.id === 3 || image.id === 4;
    } else {
      return true;
    }
  });

  const handleImageClick = (link) => {
    setActiveViz(link);
  };

  const handleCloseViz = () => {
    setActiveViz(null);
  };

  return (
    <div className="liquor-sales-analysis">
      <h2 style={{ textAlign: "left" }}>Liquor Sales Analysis</h2>
      {activeViz ? (
        <div className="tableau-viz-container">
          <button className="close-button" onClick={handleCloseViz}>
            Close
          </button>
          <script
            type="module"
            src="https://va.rajasthan.gov.in/javascripts/api/tableau.embedding.3.latest.min.js"
          ></script>
          <tableau-viz
            id="tableau-viz"
            src={activeViz}
            width="1370"
            height="3740"
            hide-tabs
            toolbar="bottom"
          ></tableau-viz>
        </div>
      ) : (
        <div className="image-grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`image-item ${
                index === images.length - 1 ? "align-left" : ""
              }`}
            >
              {image.link ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="clickable-image"
                  onClick={() => handleImageClick(image.link)}
                />
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="clickable-image"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiquorSalesAnalysis;
