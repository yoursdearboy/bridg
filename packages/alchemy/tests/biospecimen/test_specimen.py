from bridg.alchemy import Material
from bridg.alchemy.factory import SpecimenFactory


def test_specimen_material_orphans_deleted(session):
    specimen = SpecimenFactory.create_batch_sync(3)
    assert session.query(Material).count() == 3
    session.delete(specimen[0])
    session.commit()
    assert session.query(Material).count() == 2
