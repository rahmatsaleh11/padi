import { Card, CardActionArea, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { urlFetch } from "../../util/fetchData";

export default function Berita() {
    const {data, isLoading, error} = useFetch("/api/berita")
    if(isLoading) return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Skeleton height={200} width={"100%"} />   
            </Grid>
        </Grid>
    )

    if(error != null) return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Skeleton height={200} width={"100%"} />   
                </Grid>
            </Grid>
        )



    return(
        <>
        <Typography variant="h4">
            Berita
        </Typography>
        <Grid container spacing={2} my={5}>
            {
                data?.map((el : any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={el.id}>
                        <BeritaCard data={el} />
                    </Grid>
                ))
            }
        </Grid>
        </>
    )
}

function BeritaCard({data} : {data : any}) {
    const nav = useNavigate()
    return(
        <Card>
            <CardActionArea onClick={() => {
                nav("/berita/"+data.id)
            }}>
                <CardMedia
                title={data.title} 
                image={urlFetch("/api/gambar/"+data.thumb)}
                sx={{
                    height : 200
                }}
                >

                </CardMedia>
                <CardContent>
                    <Typography variant="h5">
                        {data.title}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}