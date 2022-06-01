import { PageContent } from '@components/layout';
import { Button, Input, Modal, Text } from '@medly-components/core';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { DashboardProps } from './types';

type showList = {
    pastShows: show[];
    ongingShows: show[];
    upcomingShows: show[];
};

type show = {
    title: string;
    startTime: Date | null;
    endTime: Date | null;
    movieId: number;
};
export const Dashboard: FC<DashboardProps> = ({ isLoading }) => {
    const [movies, setMovies] = useState([]);
    const [state, setState] = useState(false);
    const [movie, setMovie] = useState({
        title: '',
        duration: 0
    });

    const [shows, setShows] = useState<showList>();
    const [newShow, setNewShow] = useState<show>({
        title: '',
        startTime: null,
        endTime: null,
        movieId: 0
    });
    const [showModal, setShowModal] = useState(false);
    // const [date, setDate] = useState<Date | null>(null);

    const getMovies = async () => {
        console.log('In getMovies');
        await axios
            .get(`/api/movies`)
            .then(res => setMovies(res.data))
            .catch(err => console.log(err));
    };

    const getShows = async () => {
        await axios
            .get(`/api/shows`)
            .then(res => setShows(res.data))
            .catch(err => console.log(err));
    };
    useEffect(() => {
        getMovies();
        getShows();
    }, []);

    const openModal = () => setState(true);
    const closeModal = () => setState(false);

    const openShowModal = () => setShowModal(true);
    const closeShowModal = () => setShowModal(false);

    const addTitle = (e: any) => {
        const { value } = e.target;
        setMovie({ ...movie, title: value });
    };

    const addDuration = (e: any) => {
        const { value } = e.target;
        setMovie({ ...movie, duration: value });
    };

    const addMovie = (values: any) => {
        if (movie?.title !== '' && movie?.duration !== 0) {
            axios
                .post(`/api/movies`, values)
                .then(res => {
                    console.log(res.data);
                    closeModal();
                    getMovies();
                    setMovie({
                        title: '',
                        duration: 0
                    });
                    return null;
                })
                .catch(err => console.log(err));
        } else {
            alert('Please provide movie information');
        }
    };

    const addShow = (values: any) => {
        if (newShow?.title !== '' && newShow?.movieId !== 0) {
            axios
                .post(`/api/movies`, values)
                .then(res => {
                    console.log(res.data);
                    closeModal();
                    getMovies();
                    setMovie({
                        title: '',
                        duration: 0
                    });
                    return null;
                })
                .catch(err => console.log(err));
        } else {
            alert('Please provide movie information');
        }
    };
    console.log(shows);
    return (
        <>
            <PageContent isLoading={isLoading}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <Text textWeight="Strong" textVariant="body1">
                            List of Movies
                        </Text>
                        <Button variant="outlined" style={styles.add} onClick={openModal}>
                            Add a Movie
                        </Button>
                        <MovieList movieList={movies} />
                        {/* <ShowList showList={shows} /> */}
                    </div>
                    <div>
                        <Text textWeight="Strong" textVariant="body1">
                            List of Shows
                        </Text>
                        <Button variant="outlined" style={styles.add} onClick={openShowModal}>
                            Add a show
                        </Button>

                        {shows?.pastShows && (
                            <div>
                                <Text>Past Shows</Text>

                                {shows?.pastShows?.map((show: any) => {
                                    return (
                                        <div key={show?.id}>
                                            <Text style={styles.padding}>{show?.title}</Text>
                                            <Text style={styles.padding}>{show?.movieId}</Text>
                                            <Text style={styles.padding}>{show?.startTime}</Text>
                                            <Text style={styles.padding}>{show?.endTime}</Text>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {shows?.ongingShows && (
                            <div>
                                <Text>Ongoing Shows</Text>

                                {shows?.ongingShows?.map((show: any) => {
                                    return (
                                        <div key={show?.id}>
                                            <Text style={styles.padding}>{show?.title}</Text>
                                            <Text style={styles.padding}>{show?.movieId}</Text>
                                            <Text style={styles.padding}>{show?.startTime}</Text>
                                            <Text style={styles.padding}>{show?.endTime}</Text>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {shows?.upcomingShows && (
                            <div>
                                <Text>Upcoming Shows</Text>

                                {shows?.upcomingShows?.map((show: any) => {
                                    return (
                                        <div key={show?.id}>
                                            <Text style={styles.padding}>{show?.title}</Text>
                                            <Text style={styles.padding}>{show?.movieId}</Text>
                                            <Text style={styles.padding}>{show?.startTime}</Text>
                                            <Text style={styles.padding}>{show?.endTime}</Text>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </PageContent>
            <Modal open={state} onCloseModal={closeShowModal} data-testid="modal">
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

            <Modal open={showModal} onCloseModal={closeShowModal} data-testid="modal" minHeight="75%">
                <Modal.Header>Add Show</Modal.Header>
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
                    <Input
                        id="number-input"
                        type="dateTime-local"
                        fullWidth
                        label="Select Start Time"
                        placeholder="Enter Duration"
                        onChange={e => addDuration(e)}
                        required
                    />
                    <Input
                        id="number-input"
                        type="dateTime-local"
                        fullWidth
                        label="Select End Time"
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

export const ShowList = ({ showList }: any) => {
    console.log(showList);
    return (
        <div>
            {showList?.map((show: any) => {
                return (
                    <div key={show?.id} data-testid="show">
                        <Text style={styles.title}>{show?.title}</Text>
                        <Text style={styles.duration}>{show?.duration}</Text>
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
    },
    padding: {
        padding: 8,
        margin: 8
    }
};
