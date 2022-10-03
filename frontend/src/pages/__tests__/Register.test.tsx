import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Register from '../Register'

const queryClient = new QueryClient()

it('Register page renders correctly', () => {
	const tree = renderer
		.create(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Register />
				</BrowserRouter>
			</QueryClientProvider>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
