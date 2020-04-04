import React, { useContext } from "react";
import "assets/stylesheets/application.scss";
import { TotalsContext } from "../pages/index";
import _ from "lodash";
import "odometer/themes/odometer-theme-default.css";
import loadable from "@loadable/component";
const Odometer = loadable(() => import("react-odometerjs"));

export const Section = () => {
  const { totals, countries } = useContext(TotalsContext) || {
    totals: {},
    countries: {}
  };

  if (typeof window === "undefined" || !window.document) {
    return <div />;
  }

  const dtf = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  let d = "...";

  const totalCases = !_.isEmpty(totals) ? +totals.cases : 0;
  if (!_.isEmpty(totals)) {
    const date = new Date(totals.updated);
    d = dtf.format(date);
  }

  const sortedCountries = _.sortBy(
    !_.isEmpty(countries) ? countries : [],
    country => !country.cases
  );

  return (
    <section className="section-left">
      <div className="box totals">
        <h3>Total Confirmed</h3>
        <div className="total-number">
          <Odometer value={totalCases} duration={500} format="(,ddd)" />
        </div>
      </div>
      <div className="box countries">
        <h3>Confirmed Countries cases</h3>
        {!_.isEmpty(sortedCountries) &&
          sortedCountries.map(country => {
            if (country.country !== "World") {
              return (
                <React.Fragment key={country.country}>
                  <ul className="countries-item">
                    <li
                      className="country-title"
                      style={{ display: "inline-block" }}
                    >
                      {`${country.country} `}
                    </li>
                    <li className="country-cases">
                      <Odometer
                        value={country.cases}
                        duration={500}
                        format="(,ddd)"
                      />
                    </li>
                  </ul>
                </React.Fragment>
              );
            }
          })}
      </div>
      <div className="box last-update">
        <h3>Last Update</h3>
        <p>{!_.isEmpty(totals) ? `${d}` : "..."}</p>
      </div>
    </section>
  );
};

export default Section;
