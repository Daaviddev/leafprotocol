import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Zoom,
} from "@material-ui/core";
import { trim } from "../../helpers";
import "./stake.scss";
import { Skeleton } from "@material-ui/lab";

function Stake() {
 
  const [zoomed, setZoomed] = useState(false);
 
  const isAppLoading = useSelector(state => state.app.loading);
 
  const marketPrice = useSelector(state => {
    return state.app.marketPrice;
  });

  const leafBalance = useSelector(state => {
    return state.account.balances && state.account.balances.leaf;
  });

  const nextRewardYield = 0.02312;
  const dailyAPY =  useSelector(state => {
    return state.app.DailyAPY;
  });


  return (
    <>

      <div id="stake-view">

      <Grid container spacing={1}>


      <Grid item lg={6} md={12} sm={12} xs={12} className="olympus-card">
          <Zoom in={true}>
            <Paper className="leaf-card">
              <div className="card-header">
                <Typography variant="body1">APY</Typography>
                <Typography variant="h5">102,483,58%</Typography>    
                <Typography variant="body1">Daily ROI 1.9176%</Typography>                             
              </div>
            </Paper>
          </Zoom>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12} className="olympus-card">
          <Zoom in={true}>
            <Paper className="leaf-card">
              <div className="card-header">
                <Typography variant="body1">APY</Typography>
                <Typography variant="h5">102,483,58%</Typography>    
                <Typography variant="body1">Daily ROI 1.9176%</Typography>                             
              </div>
            </Paper>
          </Zoom>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Zoom in={true}>
            <Paper className="leaf-card">
              <div className="card-header">
                <Typography variant="body1">Your Balance</Typography>
                <Typography variant="h5">{isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim("$"+leafBalance*marketPrice, 2):"$0.00"}</>}</Typography>    
                <Typography variant="body1">{isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim(leafBalance, 2):"0.00"} LEAF</>}</Typography>                                          
              </div>             
            </Paper>
          </Zoom>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Zoom in={true}>
            <Paper className="leaf-card">
              <div className="card-header">
                  <Typography variant="body1">Next Rebase:</Typography> 
                  <Typography variant="h5" style={{"font-size":"30px", "padding-top":"10px", "padding-bottom":"20px"}}>00:12:25</Typography>                             
              </div>
             
            </Paper>
          </Zoom>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Zoom in={true}>
            <Paper className="leaf-card">
              <div className="card-header">
                  <Typography variant="body1">Your Earnings/Daily</Typography>
                  <Typography variant="h5">{isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim("$"+(dailyAPY-1)*leafBalance*marketPrice,2):"$0.00"}</>}</Typography>    
                  <Typography variant="body1">{isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim((dailyAPY-1)*leafBalance,2):"0.00"} LEAF</>}</Typography>                              
              </div>             
            </Paper>
          </Zoom>
        </Grid>       
      </Grid>      

        <Zoom in={true} onEntered={() => setZoomed(true)}>          
          <Paper className={`leaf-card`}>            
            <Grid container direction="column" spacing={2}> 

              <div className="staking-area">                             
                  <>
                    <div className={`stake-user-data`}>
                      <div className="data-row">
                        <Typography variant="body1">Current LEAF Price</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{trim("$"+marketPrice, 4)} USD</>}
                        </Typography>
                      </div>

                      <div className="data-row">
                        <Typography variant="body1">Next Reward Amount</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim((dailyAPY-1)*leafBalance*nextRewardYield,2):"0.00"} LEAF</>}
                        </Typography>
                      </div>

                      <div className="data-row">
                        <Typography variant="body1">Next Reward Amount USD</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim("$"+(dailyAPY-1)*leafBalance*nextRewardYield*marketPrice,4):"$0.00"} USD</>}
                        </Typography>
                      </div>

                      <div className="data-row">
                        <Typography variant="body1">Next Reward Yield</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardYield}%</>}
                        </Typography>
                      </div>

                      <div className="data-row">
                        <Typography variant="body1">ROI (30-Day Rate)</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>76.80%</>}
                        </Typography>
                      </div>

                      <div className="data-row">
                        <Typography variant="body1">ROI (30-Day Rate) USD</Typography>
                        <Typography variant="body1">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{leafBalance?trim("$"+leafBalance*marketPrice/Math.pow(10, 9)*0.7680, 4):"$0.00"}USD</>}
                        </Typography>
                      </div>
                    </div>
                  </>                
              </div>
            </Grid>
          </Paper>
        </Zoom>

       
      </div>
    </>

  );
}

export default Stake;
