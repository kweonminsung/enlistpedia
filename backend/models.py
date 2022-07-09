from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from .database import Base
from sqlalchemy.orm import relationship


class Military_Type(Base):
    __tablename__ = 'types'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(3))
    
class Specialty(Base):
    __tablename__ = 'specialties'
    
    id = Column(Integer, primary_key=True, index= True)
    military_type_id = Column(Integer, ForeignKey('types.id'))
    
    name = Column(String(20))
    specialty_type = Column(String(10))
    perfect_score = Column(Integer)
    has_eligibility = Column(Boolean)
    comment = Column(String)
    info_url = Column(String)
    every_major_direct = Column(Boolean)
    every_major_indirect = Column(Boolean)
    every_certificate = Column(Boolean)
    is_deleted = Column(Boolean)
    

class Recruit_result(Base):
    __tablename__ = 'recruit_results'
    
    specialty_id = Column(Integer, ForeignKey("specialties.id"), primary_key=True)
    Column('enlist_date', Date)
    Column('min_score', Integer)    
    
class Major(Base):
    __tablename__ = 'majors'
    
    id = Column(Integer, primary_key=True, index= True)
    name = Column(String)
    
class Certificate(Base):
    __tablename__ = 'certificates'
    
    id = Column(Integer, primary_key=True, index= True)
    name = Column(String)
    rank = Column(Integer)
    comment = Column(String)


specialty_major = Table('specialty_major', Base.metadata,
    Column('specialty_id', ForeignKey('specialties.id'), primary_key = True)
    Column('major_id', ForeignKey('majors.id'), primary_key = True)
    Column('is_direct', Boolean)
)

specialty_certificate = Table('specialty_certificate', Base.metadata,
    Column('specialty_id', ForeignKey('specialties.id'), primary_key = True)
    Column('certificate_id', ForeignKey('certificates.id'), primary_key = True)
    Column('is_direct', Boolean)
)