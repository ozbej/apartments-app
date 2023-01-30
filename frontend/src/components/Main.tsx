import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Apartment from './Apartment';
import '../styles/main.css'

interface ApartmentObject {
  id: number;
  link: string;
  title: string;
  location: string;
  price: string;
  apartmentImages: string[];
}

interface ApartmentImagesObject {
  apartment_id: number;
  link: string;
}

function Main() {
  const [apartments, setApartments] = useState<ApartmentObject[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("newest");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return apartments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, apartments, pageSize]);

  const pageChanged = (event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  }

  const pageSizeChanged = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  const sortByChanged = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);

    let sortedApartments = [...apartments];

    if (event.target.value === "newest") {
      sortedApartments.sort(function(a: ApartmentObject, b: ApartmentObject) {
        return a.id - b.id;
      });
    }
    else if (event.target.value === "oldest") {
      sortedApartments.sort(function(a: ApartmentObject, b: ApartmentObject) {
        return b.id - a.id;
      });
    }
    else if (event.target.value === "cheapest") {
      sortedApartments.sort(function(a: ApartmentObject, b: ApartmentObject) {
        return Number(a.price.replace(/\s/g,"").replace("CZK", "")) - Number(b.price.replace(/\s/g,"").replace("CZK", ""));
      });
    }
    else if (event.target.value === "mostExpensive") {
      sortedApartments.sort(function(a: ApartmentObject, b: ApartmentObject) {
        return Number(b.price.replace(/\s/g,"").replace("CZK", "")) - Number(a.price.replace(/\s/g,"").replace("CZK", ""));
      });
    }

    setApartments(sortedApartments);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          let apartmentsResponse: Response = await fetch("http://127.0.0.1:8000/apartments", {
            method: "GET",
            headers : {
              'Content-Type':'application/json'
            }
          })
          let apartmentsJson: ApartmentObject[] = await apartmentsResponse.json();

          let apartmentImagesResponse: Response = await fetch("http://127.0.0.1:8000/apartment_images", {
            method: "GET",
            headers : {
              'Content-Type':'application/json'
            }
          })
          let apartmentImagesJson: ApartmentImagesObject[] = await apartmentImagesResponse.json();
          apartmentImagesJson.forEach((item: ApartmentImagesObject, index: number) => {
            if (apartmentsJson[item.apartment_id].apartmentImages === undefined) apartmentsJson[item.apartment_id].apartmentImages = [];
            else apartmentsJson[item.apartment_id].apartmentImages.push(item.link);
          })

          setApartments(apartmentsJson);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []); 

  return (
    <div className="main-container">
      <a href="#" className="stt" />
      <Typography variant="h4" component="div" sx={{mb: 2, mt: 2}}>
        Apartments for sale
      </Typography>
      <div className="parameter-container">
        <div className="sort-by">
          <Typography>
            Sort by:
          </Typography>
          <FormControl id="sort-by-select">
            <Select
              value={sortBy}
              onChange={sortByChanged}
              autoWidth
            >
              <MenuItem value={"newest"}>Newest</MenuItem>
              <MenuItem value={"oldest"}>Oldest</MenuItem>
              <MenuItem value={"cheapest"}>Cheapest</MenuItem>
              <MenuItem value={"mostExpensive"}>Most expensive</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="page-size">
          <Typography>
            Apartments per page:
          </Typography>
          <FormControl id="page-size-select">
            <Select
              value={pageSize.toString()}
              onChange={pageSizeChanged}
              autoWidth
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {apartments.length !== 0 && (
        <div className="apartments-container">
          {currentTableData.map((apartment: ApartmentObject, index: number) => (
            <Apartment apartment={apartment} />
          ))}
        </div>
      )}
      <Pagination count={Math.ceil(apartments.length / pageSize)} color="primary" sx={{mb: 2}} onChange={pageChanged} />
    </div>
  )
}
export default Main;