import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Login from '../Login'

const queryClient = new QueryClient()

it('The Login page renders correctly', () => {
	const tree = renderer
		.create(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</QueryClientProvider>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
