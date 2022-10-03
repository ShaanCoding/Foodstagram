import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Logout from '../Logout'

const queryClient = new QueryClient()

it('The Logout page renders correctly', () => {
	const tree = renderer
		.create(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Logout />
				</BrowserRouter>
			</QueryClientProvider>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
