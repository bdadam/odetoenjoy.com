import 'source-map-support/register';
import 'ignore-styles';

import app from './app';

app.listen(process.env.PORT || 3000);
