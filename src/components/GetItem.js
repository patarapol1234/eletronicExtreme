import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate'


const GetItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [chanceNumber, setChanceNumber] = useState(0);
  const [keyword, setKeyword] = useState("")
  const [itemNoSpace, setItemNoSpace] = useState([]);
  const [itemOutofStock, setItemOutofStock] = useState([])
  const [currentPage, setCurrentPage] =  React.useState(1);
  const [postsPerPage] =  React.useState(10);

  //Chance
const noDuplicates = (name) => {
  const checkedValue = itemOutofStock.includes(name);
  if (checkedValue) {
    const noDuplicates = itemOutofStock.filter((c, index) => {
      return itemOutofStock.indexOf(c) === index;
    });
    setItemOutofStock(noDuplicates);
  } else {
    setItemOutofStock([...itemOutofStock, name]);
  }
};
  const countItem = itemNoSpace.reduce((x, y) => {
    if (x[y]) {
      x[y] += 1;
    } else {
      x[y] = 1;
    }
    return x;
  }, {});

  const randomItemChance = () => {
    setChanceNumber(Math.floor(Math.random() * 100 + 1));
  };

  const handleChance = () => {
    if (1 <= chanceNumber && chanceNumber <= 12)  {
    
      if (countItem.SmallPotionHeal < 1000 || countItem.SmallPotionHeal === undefined) {
        setItem([...item, "Small Potion Heal"]);
        setItemNoSpace([...itemNoSpace, "SmallPotionHeal"])
        if (countItem.SmallPotionHeal === 999) {
          noDuplicates("Small Potion Heal")
        }
      }else {
        randomItemChance()
      }
      
    } else if (12 < chanceNumber && chanceNumber <= 20) {
     
      if (countItem.MediumPotionHeal < 80 || countItem.MediumPotionHeal === undefined) {
        setItem([...item, "Medium Potion Heal"]);
        setItemNoSpace([...itemNoSpace, "MediumPotionHeal"])
        if (countItem.MediumPotionHeal === 79) {
          noDuplicates("Medium Potion Heal")
        }
      }else {
        randomItemChance()
      }
      
    } 

    else if (20 < chanceNumber && chanceNumber <= 26) {
    
      if (countItem.BigPotionHeal < 15 || countItem.BigPotionHeal === undefined) {
        setItem([...item, "Big Potion Heal"]);
        setItemNoSpace([...itemNoSpace, "BigPotionHeal"])
        if (countItem.BigPotionHeal === 14) {
          noDuplicates("Big Potion Heal")
        }
      }else {
        randomItemChance()
      }
      
    } 

    else if (26 < chanceNumber && chanceNumber <= 30) {
    
      if (countItem.FullPotionHeal < 10 || countItem.FullPotionHeal === undefined) {
        setItem([...item, "Full Potion Heal"]);
        setItemNoSpace([...itemNoSpace, "FullPotionHeal"])
        if (countItem.FullPotionHeal === 9) {
          noDuplicates("Full Potion Heal")
        }
      }else {
        randomItemChance()
      }
      
    } 

    else if (30 < chanceNumber && chanceNumber <= 42) {
    
      if (countItem.SmallMPPotion < 1000 || countItem.SmallMPPotion === undefined) {
        setItem([...item, "Small MP Potion"]);
        setItemNoSpace([...itemNoSpace, "SmallMPPotion"])
        if (countItem.SmallMPPotion === 999) {
          noDuplicates("Small MP Potion")
        }
      }else {
        randomItemChance()
      }
      
    } 
    else if (42 < chanceNumber && chanceNumber <= 50) {
   
      if (countItem.MediumMPPotion < 80 || countItem.MediumMPPotion === undefined) {
        setItem([...item, "Medium MP Potion"]);
        setItemNoSpace([...itemNoSpace, "MediumMPPotion"])
        if (countItem.MediumMPPotion === 79) {
          noDuplicates("Medium MP Potion")
        }
      }else {
        randomItemChance()
      }
      
    } 

    else if (50 < chanceNumber && chanceNumber <= 56) {

      if (countItem.BigMPPotion < 15 || countItem.BigMPPotion === undefined) {
        setItem([...item, "Big MP Potion"]);
        setItemNoSpace([...itemNoSpace, "BigMPPotion"])
        if (countItem.BigMPPotion === 14) {
          noDuplicates("Big MP Potion")
        }
      }else {
        randomItemChance()
      }
    } 

    else if (56 < chanceNumber && chanceNumber <= 60) {
  
      if (countItem.FullMPPotion < 8 || countItem.FullMPPotion === undefined) {
        setItem([...item, "Full MP Potion"]);
        setItemNoSpace([...itemNoSpace, "FullMPPotion"])
        if (countItem.FullMPPotion === 7) {
          noDuplicates("Full MP Potion")
        }
      }else {
        randomItemChance()
      }
    } 

    else if (60 < chanceNumber && chanceNumber <= 65) {
      
      if (countItem.AttackRing < 10 || countItem.AttackRing === undefined) {
        setItem([...item, "Attack Ring"]);
        setItemNoSpace([...itemNoSpace, "AttackRing"])
        if (countItem.AttackRing === 9) {
          noDuplicates("Attack Ring")
        }
      }else {
        randomItemChance()
      }
      
    } 

    else if (65 < chanceNumber && chanceNumber <= 70) {
    
      if (countItem.DefenseRing < 10 || countItem.DefenseRing === undefined) {
        setItem([...item, "Defense Ring"]);
        setItemNoSpace([...itemNoSpace, "DefenseRing"])
        if (countItem.DefenseRing === 9) {
          noDuplicates("Defense Ring")
        }
      }else {
        randomItemChance()
      }
      
    } 
    else if (70 < chanceNumber && chanceNumber <= 85) {
    
      if (countItem.LuckyKey < 1000 || countItem.LuckyKey === undefined) {
        setItem([...item, "Lucky Key"]);
        setItemNoSpace([...itemNoSpace, "LuckyKey"])
        if (countItem.LuckyKey === 999) {
          noDuplicates("Lucky Key")
        }
      }else {
        randomItemChance()
      }
      
    } 
    else if (85 < chanceNumber && chanceNumber <= 100)  {
     
      if (countItem.SilverKey < 1000 || countItem.SilverKey === undefined) {
        setItem([...item, "Silver Key"]);
        setItemNoSpace([...itemNoSpace, "SilverKey"])
        if (countItem.SilverKey === 999) {
          noDuplicates("Silver Key")
        }
      }else {
        randomItemChance()
      }
      
    }
  };

  useEffect(() => {
    handleChance();
  }, [chanceNumber]);
  
  const Edit = () => {
    navigate('/editdata')
  } 
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const onChange = (e) => {
    const {value} = e.target
    setKeyword(value)
  }

  React.useEffect(() => {
    setTimeout(() => {
      navigate('/login')
      localStorage.removeItem('token')
      (alert('please Login agian'))
    
    }, 1800000);
  }, [])

  const itemSearch = item.filter((filterd) => filterd.toLowerCase().includes(keyword.toLowerCase()))

  

 
  const paginate = (pageNumber) =>{ keyword !== "" ? setCurrentPage(1) :
  setCurrentPage(pageNumber.selected +1);}


  const totalPosts = itemSearch.length
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = itemSearch.slice(indexOfFirstPost, indexOfLastPost); //(0,12) เอา 12 ตัวแรก



  return (
    <>
    <div style={{display:'flex', flexDirection:'row', marginTop:'100px', width:"1000px"}}>
    <div style={{display:'flex', flexDirection:'column',width:'50%'}}>
    <button onClick={Edit}>Edit data</button>
    <button onClick={logout}>Logout</button>
      <button onClick={randomItemChance}>Get Your Item</button>
      <input type="text" onChange={onChange}/>
      <div style={{height:'250px'}}>
      {currentPosts.filter((val) => {
        if(val.toLowerCase().includes(keyword.toLowerCase())){
          return val
        }
      }).map((data, i) => {
        return <div key={i}>{i+1+ ") : "}{data}</div>;
      })}
      </div>

      <ReactPaginate
                  previousLabel={'PREV'}
                  nextLabel={'NEXT'}
                  breakLabel={'...'}
                  pageCount={pageNumbers.length}
                  marginPagesDisplayed={3}
                  onPageChange={paginate}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                  />
    
      </div>

      <div style={{width:'50%'}}>
     <ul>
     <h1>Item out of stock</h1>
      {itemOutofStock.map((data, i) => {
        return (
          <div key={i}>
            <li >{data}</li>
          </div>
        )
      })
       }
      </ul>
     </div>
      </div>
    </>
  );
};

export default GetItem;


