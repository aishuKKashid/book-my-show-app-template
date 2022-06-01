import { PageContent } from '@components/layout';
import { Button, Input, Modal, Text } from '@medly-components/core';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { DashboardProps } from './types';

export const Dashboard: FC<DashboardProps> = ({ isLoading }) => {
    const [movies, setMovies] = useState([]);
    const [state, setState] = useState(false);
    const [movie, setMovie] = useState({
        title: '',
        duration: 0
    });

    const getMovies = async () => {
        console.log('In getMovies');
        await axios
            .get(`/api/movies`)
            .then(res => setMovies(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getMovies();
    }, []);

    const openModal = () => setState(true);
    const closeModal = () => setState(false);

    const addTitle = (e: any) => {
        const { value } = e.target;
        setMovie({ ...movie, title: value });
    };

    const addDuration = (e: any) => {
        const { value } = e.target;
        setMovie({ ...movie, duration: value });
    };

    const addMovie = (values: any) => {
        // if()
        axios
            .post(`/api/movies`, values)
            .then(res => {
                console.log(res.data);
                closeModal();
                getMovies();
                return null;
            })
            .catch(err => console.log(err));
    };
    console.log(movie);
    return (
        <>
            <PageContent isLoading={isLoading}>
                <Text textWeight="Strong" textVariant="body1">
                    List of Movies
                </Text>
                <Button variant="outlined" style={styles.add} onClick={openModal}>
                    Add a Movie
                </Button>
                <MovieList movieList={movies} />
            </PageContent>
            <Modal open={state} onCloseModal={closeModal} data-testid="modal">
                <Modal.Header>Add Movie</Modal.Header>
                <Modal.Content>
                    <Input
                        id="name-input"
                        type="text"
                        fullWidth
                        label="Title"
                        placeholder="Enter Movie Title"
                        name="title"
                        onChange={e => addTitle(e)}
                        required
                    />
                    <Input
                        id="number-input"
                        type="number"
                        fullWidth
                        label="Duration"
                        placeholder="Enter Duration"
                        onChange={e => addDuration(e)}
                        required
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button variant="outlined" onClick={() => addMovie(movie)}>
                        Add Movie
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};
Dashboard.displayName = 'Dashboard';

export const MovieList = ({ movieList }: any) => {
    console.log(movieList);
    return (
        <div>
            {movieList?.map((movie: any) => {
                return (
                    <div key={movie?.id} data-testid="movie">
                        <Text style={styles.title}>{movie?.title}</Text>
                        <Text style={styles.duration}>{movie?.duration}</Text>
                    </div>
                );
            })}
        </div>
    );
};

const styles = {
    title: {
        padding: 8
    },
    duration: {
        padding: 8
    },
    add: {
        margin: 16
    }
};
