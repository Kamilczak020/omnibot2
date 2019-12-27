import { mockMessageEntity } from 'tests/repository/mockMessageEntity';
import { FilterReason } from 'src/service/filter';

export const mockFilteredEntity = {
  id: '1',
  reason: FilterReason.Unknown,
  message: mockMessageEntity,
};
