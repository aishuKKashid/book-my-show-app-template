import { mockAxios, render } from '@test-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './';

describe('Dashboard', () => {
    beforeEach(async () =>
        mockAxios.onGet(`/api/movies`).reply(200, [
            {
                id: 1,
                title: 'Avengers',
                duration: 8111
            },
            { id: 2, title: 'Dr. Strange', duration: 360 }
        ])
    );

    afterEach(() => mockAxios.resetHistory());

    it('should render properly', async () => {
        const { container } = render(<Dashboard />);
        // await waitFor(() => expect(mockAxios.history.get.length).toEqual(1));
        expect(container).toMatchSnapshot();
    });

    it('should show loading if isLoading Prop is true', () => {
        const { container } = render(<Dashboard isLoading />);
        expect(container).toMatchSnapshot();
    });

    it('should render button properly', () => {
        render(<Dashboard />);
        const button = screen.getByRole('button', { name: /Add a Movie/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/Add a Movie/);
    });

    it('should show list', async () => {
        render(<Dashboard />);
        const a = await screen.findByText(/Avengers/i);
        await screen.findByText(/Dr. Strange/i);
        expect(a).toBeInTheDocument();
    });

    it('check if the modal is getting render on click', () => {
        render(<Dashboard />);
        const button = screen.getByText(/Add a Movie/i);
        fireEvent.click(button);
        expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
    });

    it('check if movie is getting added', async () => {
        // mockAxios.onPost('/api/movies', { title: 'ABCD', duration: 420 }).reply(200, 3);
        // mockAxios.onGet('/api/movies').reply(200, [{ id: 3, title: 'ABCD', duration: 420 }]);
        render(<Dashboard />);
        const button = screen.getByText(/Add a Movie/i);
        fireEvent.click(button);

        // const titleInput = screen.getAllByLabelText(/Title/i);
        // userEvent.type(titleInput, ['ABCD']);
        // expect(titleInput).toHaveValue('ABCD');

        const titleInput = screen.getByTestId(/name-input/i);
        userEvent.type(titleInput, 'ABCD');
        expect(titleInput).toHaveValue('ABCD');

        const durationInput = screen.getByTestId(/number-input/i);
        userEvent.type(durationInput, '300');
        expect(titleInput).toHaveValue('300');

        const a = await screen.findByText(/ABCD/i);
        expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
        expect(a).toBeInTheDocument();
    });
});
